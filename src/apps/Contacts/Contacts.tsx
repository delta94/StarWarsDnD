import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import {
	ImageContainerShape,
	renderContactImage,
	renderFactionEmblem,
} from '../../utilities/ImageUtilities';
import { fetchFromBackendFunction } from '../../utilities/NetlifyUtilities';
import { Actions, deselectContact, loadContacts, selectContact } from './Actions';
import { Contact } from './Contact';
import { AppState } from './State';
import './Styling/Contacts.css';

/**
 * State parameters used by the Datapad app component.
 */
type Parameters = AppState;

/**
 * Contacts {@link https://reactjs.org/docs/render-props.html | Render Props}
 */
type Props = Actions & Parameters;

class ContactsComponent extends React.Component<Props> {
	public constructor(props: Props) {
		super(props);
	}

	private isSelected(contact: Contact): boolean {
		return contact._id === this.props.contactSelection;
	}

	/**
	 * {@inheritdoc React.Component.componentDidMount}
	 */
	public componentDidMount(): void {
		if (!this.props.contacts) {
			this.fetchContacts();
		}
	}

	private async fetchContacts(): Promise<void> {
		const getContactsFunction = 'GetAllContacts';
		const response = await fetchFromBackendFunction(getContactsFunction);
		const contacts: Contact[] = response.contacts;

		if (contacts.length > 0) {
			this.props.loadContacts(contacts);
		}
	}

	public render(): ReactNode {
		if (this.props.contacts) {
			return <div className="Contacts">{this.renderContacts()}</div>;
		}
		return this.renderLoadingScreen();
	}

	private renderLoadingScreen(): ReactNode {
		return (
			<>
				<div>Loading contacts...</div>
				<Spinner animation="border" variant="light"></Spinner>
			</>
		);
	}

	/**
	 * Renders the Contacts app view.
	 * Displays information about the selected contact.
	 */
	public renderContacts(): ReactNode {
		if (!this.props.contacts) {
			throw new Error('Cannot render contacts; none have been loaded.');
		}
		return (
			<Scrollbars
				className="Contacts-view"
				autoHide={true}
				autoHeight={false}
				onClick={() => {
					// TODO: clicking on scroll bar should not deselect items
					this.props.deselectContact();
				}}
			>
				<CardColumns
					style={{
						padding: 10,
					}}
				>
					{this.props.contacts.map((contact) => this.renderContact(contact))}
				</CardColumns>
			</Scrollbars>
		);
	}

	private renderContact(contact: Contact): React.ReactNode {
		const isSelected = this.isSelected(contact);
		const cardHeader = this.renderContactCardHeader(contact);
		const cardBody = this.isSelected(contact) ? this.renderContactCardBody(contact) : <></>;
		return (
			<Card
				bg="dark"
				border={isSelected ? 'primary' : undefined}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick={(event: any) => {
					this.props.selectContact(contact._id);
					event.stopPropagation();
				}}
				style={{
					maxWidth: 500,
				}}
			>
				{cardHeader}
				{cardBody}
			</Card>
		);
	}

	private renderContactCardHeader(contact: Contact): React.ReactNode {
		const isSelected = this.isSelected(contact);
		const name = this.renderName(contact);
		const contactImage = isSelected ? (
			<></>
		) : (
			renderContactImage(contact.name, {
				displayHeightInPixels: 60,
				containerShape: ImageContainerShape.RoundedRectangle,
			})
		);
		const affilliationImage = isSelected ? <></> : this.renderAffilliationImage(contact, 60);
		return (
			<Card.Header
				style={{
					overflow: 'hidden',
				}}
			>
				<Media>
					{contactImage}
					<Media.Body>{this.renderName(contact)}</Media.Body>
					{affilliationImage}
				</Media>
			</Card.Header>
		);
	}

	private renderContactCardBody(contact: Contact): React.ReactNode {
		const raceLink = this.getRaceLinkUrl(contact);

		let affiliationsString = 'None';
		if (contact.affiliations && contact.affiliations.length > 0) {
			affiliationsString = contact.affiliations?.join(', ');
		}

		const contactImage = renderContactImage(contact.name, {
			displayHeightInPixels: 150,
			containerShape: ImageContainerShape.RoundedRectangle,
		});
		const affilliationImage = this.renderAffilliationImage(contact, 150);

		return (
			<Card.Body>
				<Row>
					<Col>
						<Media>
							{contactImage}
							<Media.Body>
								<Row>
									<Col>
										<p>
											<b>Race: </b>
											{contact.race ? (
												<a
													href={raceLink}
													target="_blank"
													rel="noopener noreferrer"
												>
													{contact.race}
												</a>
											) : (
												'Unkown'
											)}
										</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p>
											<b>Gender: </b>
											{this.stringOrUnknown(contact.gender)}
										</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p>
											<b>Known Affiliations: </b>
											{affiliationsString}
										</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p>
											<b>Status: </b>
											{this.stringOrUnknown(contact.status)}
										</p>
									</Col>
								</Row>
							</Media.Body>
							{affilliationImage}
						</Media>
					</Col>
				</Row>
			</Card.Body>
		);
	}

	private renderName(contact: Contact): React.ReactNode {
		return (
			<div
				style={{
					minWidth: 100,
				}}
			>
				{contact.name}
			</div>
		);
	}

	private getRaceLinkUrl(contact: Contact): string | undefined {
		return contact.race
			? `https://starwars.fandom.com/wiki/${contact.race.replace(' ', '_')}/Legends`
			: undefined;
	}

	private stringOrUnknown(value: string | undefined): string {
		return value ?? 'Unkown';
	}

	private renderAffilliationImage(
		contact: Contact,
		displayHeightInPixels: number,
	): React.ReactNode {
		if (!contact.affiliations || contact.affiliations.length === 0) {
			return <></>;
		}

		// Render emblem for first listed faction affiliation.
		return renderFactionEmblem(contact.affiliations[0], {
			displayHeightInPixels,
			containerShape: ImageContainerShape.Rectangle,
		});
	}
}

/**
 * {@inheritdoc react-redux/MapStateToPropsParam}
 */
function mapStateToProps(state: AppState): Parameters {
	return state;
}

/**
 * Contacts app.
 * Displays known contacts.
 */
const Contacts = connect(mapStateToProps, {
	selectContact,
	deselectContact,
	loadContacts,
})(ContactsComponent);

export default Contacts;
