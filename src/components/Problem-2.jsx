import React, { useState, useEffect } from 'react';

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://contact.mediusware.com/api/contact', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'ykj5677n54k7894n', // Replace with your API key
          },
        });
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term and onlyEven checkbox
  const filteredContacts = contacts.filter((contact) => {
    const isEven = contact.id % 2 === 0;
    const matchesSearchTerm = contact.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (onlyEven) {
      return isEven && matchesSearchTerm;
    } else {
      return matchesSearchTerm;
    }
  });

  // Load next page on scrolling to the bottom of the modal
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Open Modal A
  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);
  };

  // Open Modal B
  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
  };

  // Open Modal C and set selected contact
  const openModalC = (contact) => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(true);
    setSelectedContact(contact);
  };

  // Close all modals
  const closeModal = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      {modalAOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal A</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body" onScroll={handleScroll}>
                {/* Contacts list */}
                {filteredContacts.map((contact) => (
                  <div className="contact-item" key={contact.id} onClick={() => openModalC(contact)}>
                    {contact.name}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="button" onClick={openModalA}>
                  Modal Button A
                </button>
                <button className="btn btn-primary" type="button" onClick={openModalB}>
                  Modal Button B
                </button>
                <button className="btn btn-primary" type="button" onClick={closeModal}>
                  Modal Button C
                </button>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="onlyEvenCheckbox"
                    checked={onlyEven}
                    onChange={(e) => setOnlyEven(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                    Only even
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal B */}
      {modalBOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal B</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body" onScroll={handleScroll}>
                {/* Contacts list */}
                {filteredContacts.map((contact) => (
                  <div className="contact-item" key={contact.id} onClick={() => openModalC(contact)}>
                    {contact.name}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="button" onClick={openModalA}>
                  Modal Button A
                </button>
                <button className="btn btn-primary" type="button" onClick={openModalB}>
                  Modal Button B
                </button>
                <button className="btn btn-primary" type="button" onClick={closeModal}>
                  Modal Button C
                </button>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="onlyEvenCheckbox"
                    checked={onlyEven}
                    onChange={(e) => setOnlyEven(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                    Only even
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal C */}
      {modalCOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal C</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {selectedContact && (
                  <>
                    <div>Contact Name: {selectedContact.name}</div>
                    <div>Contact Email: {selectedContact.email}</div>
                    <div>Contact Phone: {selectedContact.phone}</div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="button" onClick={openModalA}>
                  Modal Button A
                </button>
                <button className="btn btn-primary" type="button" onClick={openModalB}>
                  Modal Button B
                </button>
                <button className="btn btn-primary" type="button" onClick={closeModal}>
                  Modal Button C
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
