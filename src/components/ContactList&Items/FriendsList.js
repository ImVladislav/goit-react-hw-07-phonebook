import { useDispatch, useSelector } from 'react-redux';
import { StyledList } from './FriendsList.styled';
import { FriendItem } from './FriendsItem';
import { Button } from 'components/Button/Button';
import { FriendDescription } from './FriendsItem.styled';
import { fetchContacts, deleteContact } from 'redux/contactsOperations';
import { useEffect } from 'react';
import { onDeleteContact } from 'utils/notify';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactList = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contactList.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <StyledList>
      {filteredContacts.map(({ id, name, phone }) => (
        <FriendItem key={id}>
          <FriendDescription>
            {name}: {phone}
          </FriendDescription>
          <Button
            type="button"
            onClick={() => {
              onDeleteContact(name);
              dispatch(deleteContact(id));
            }}
            text="Delete"
          />
        </FriendItem>
      ))}
    </StyledList>
  );
};
