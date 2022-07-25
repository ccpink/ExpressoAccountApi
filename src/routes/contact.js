import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import { json } from 'body-parser';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.contacts));
});

router.get('/:contactId', (req, res) => {
  return res.send(req.context.models.contacts[req.params.contactId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const contact = {
    id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,

  };

  req.context.models.contacts[id] = contact;

  return res.send(contact);
});

router.delete('/:contactId', (req, res) => {
  const {
    [req.params.contactId]: contact,
    ...othercontacts
  } = req.context.models.contacts;

  req.context.models.contacts = othercontacts;

  return res.send(contact);
});

router.put('/', (req, res) => {
  const contact = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,
  };

  req.context.models.contacts[id] = contact;

  return res.send(json)
});

export default router;
