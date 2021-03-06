export { contactSchema } from './ContactSchema';

/**
 * Database including all of the contact-related collections.
 * TODO: rename to `contacts`
 */
export const databaseName = 'datapad';

/**
 * Name of the MongoDB collection containing the Contacts
 */
export const collectionName = 'contacts';

// TODO: other functions...

// router.route('/add').post((req, res) => {
// 	const name = req.body.name;
// 	const species = req.body.species;
// 	const gender = req.body.gender;
// 	const affiliations = req.body.affiliations;

// 	const newContact = new Contact({ name, species, gender, affiliations });

// 	newContact
// 		.save()
// 		.then(() => res.json(`Add contact: ${name}`))
// 		.catch((err) => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
// 	Contact.findById(req.params.id)
// 		.then((contact) => res.json(contact))
// 		.catch((err) => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
// 	Contact.findByIdAndDelete(req.params.id)
// 		.then(() => res.json(`Deleted contact: ${req.body.name}`))
// 		.catch((err) => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
// 	Contact.findById(req.params.id)
// 		.then((contact) => {
// 			contact.name = req.body.name;
// 			contact.species = req.body.species;
// 			contact.gender = req.body.gender;
// 			contact.affiliations = req.body.affiliations;

// 			contact
// 				.save()
// 				.then(() => res.json(`Updated contact: ${req.body.name}`))
// 				.catch((err) => res.status(400).json('Error: ' + err));
// 		})
// 		.catch((err) => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
