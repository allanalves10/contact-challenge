import { useState, useEffect } from 'react'
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Box, Checkbox } from '@mui/material'
import api from '../../lib/axios'
import { IContact } from '../../interfaces/iContact'
import { toast } from 'react-toastify'
import { useAuthentication } from '../../context/authenticationContext'
import MapComponent from '../../components/map'
import { validateCPF } from '../../utils/functions'
import { Container, ListContactsContainer, MapContainer } from './styles'

const Home = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null)
  const [newContact, setNewContact] = useState<IContact>({
    address: {
      cep: '',
      city: '',
      location: { type: '', coordinates: { latitude: '', longitude: '' } },
      neighborhood: '',
      number: '',
      state: '',
      street: '',
    },
    id: '',
    cpf: '',
    name: '',
    phone: '',
    userId: '',
  })
  const { user } = useAuthentication()

  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts')

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    }
  }, [])

  const handleCepChange = async (cep: string) => {
    setNewContact((prev) => ({
      ...prev,
      address: { ...prev.address, cep },
    }))

    if (cep.length === 8) {
      try {
        const response = await api.get(`/${cep}`)
        const addressData = response.data

        setNewContact((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: addressData.city,
            neighborhood: addressData.neighborhood,
            state: addressData.state,
            street: addressData.street,
            location: {
              type: addressData.location.type,
              coordinates: {
                latitude: addressData.location.coordinates.latitude,
                longitude: addressData.location.coordinates.longitude,
              },
            },
          },
        }))
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        toast.error('Não foi possível buscar o CEP. Verifique o CEP e tente novamente.')
      }
    }
  }

  const resetForm = () => {
    setNewContact({
      address: {
        cep: '',
        city: '',
        location: { type: '', coordinates: { latitude: '', longitude: '' } },
        neighborhood: '',
        number: '',
        state: '',
        street: '',
      },
      id: '',
      cpf: '',
      name: '',
      phone: '',
      userId: '',
    })
  }

  const handleAddContact = () => {
    if (!validateCPF(newContact.cpf)) {
      toast.error("CPF inválido! Não é possível adicionar o contato.")
      return
    }

    const documentCurrentContact = newContact.cpf.replace(/[^0-9]/g, "")

    if (contacts.find((contact) => contact.cpf === documentCurrentContact)) {
      toast.error('Já existe um contato cadastrado com este CPF!')
      return
    }

    const updateListContacts = [...contacts, { ...newContact, id: crypto.randomUUID(), userId: user?.id || '', cpf: documentCurrentContact }]
    setContacts(updateListContacts)
    localStorage.setItem('contacts', JSON.stringify(updateListContacts))
    resetForm()

    toast.success('Contato adicionado com sucesso!')
    setOpenDialog(false)
  }

  const handleSelectContact = (contact: IContact) => {
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null)
      return
    }

    if (!contact.address.location.coordinates.latitude || !contact.address.location.coordinates.longitude) {
      toast.error('Contato não possui coordenadas de sua localização.')
    }

    setSelectedContact(contact)
  }

  const handleDeleteContact = (contact: IContact) => {
    const updatedContacts = contacts.filter((contactItem) => contactItem.id !== contact.id)
    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
    if (selectedContact?.id === contact.id) setSelectedContact(null)
    toast.success('Contato excluído com sucesso!')
  }

  const handleCancelContact = () => {
    resetForm()
    setOpenDialog(false)
  }

  const filteredContacts = contacts
    .filter((contact) => 
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.cpf.includes(filter)
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === 'asc') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Lista de Contatos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Adicionar Contato
      </Button>

      <Box display="flex" maxWidth="50%" alignItems="center" marginBottom={2}>
        <TextField
          label="Filtrar por Nome ou CPF"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          margin="normal"
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            sx={{ marginLeft: 2 }}
          >
            Ordenar ({sortOrder === 'asc' ? 'Decrescente' : 'Crescente'})
          </Button>
        </Box>
      </Box>

      <Container>
        <ListContactsContainer>
          <Box>
            {!!filteredContacts.length ? filteredContacts.map((contact, index) => (
              <Box
                key={index}
                padding={2}
                marginBottom={2}
                border="1px solid #ddd"
                borderRadius="8px"
                display="flex"
                flexDirection="column"
                position="relative"
              >
                <Checkbox
                  checked={selectedContact?.id === contact.id}
                  onChange={() => handleSelectContact(contact)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                />
                <Typography variant="h6">{contact.name}</Typography>
                <Typography>CPF: {contact.cpf}</Typography>
                <Typography>Telefone: {contact.phone}</Typography>
                <Typography>Endereço: {`${contact.address.street}, ${contact.address.number}, ${contact.address.neighborhood}, ${contact.address.city} - ${contact.address.state}`}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteContact(contact)}
                  sx={{ marginTop: 2 }}
                >
                  Excluir
                </Button>
              </Box>
            )) : <Typography variant="h6">Sem Contatos Encontrados</Typography>
          }
          </Box>
        </ListContactsContainer>
        
        <MapContainer>
          <MapComponent 
            lat={Number(selectedContact?.address.location.coordinates.latitude)}
            lng={Number(selectedContact?.address.location.coordinates.longitude)}
          />
        </MapContainer>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Adicionar Contato</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <TextField
            label="CPF"
            fullWidth
            margin="normal"
            value={newContact.cpf}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, "")
              let formattedValue = rawValue
          
              if (rawValue.length > 3) {
                formattedValue = `${rawValue.slice(0, 3)}.${rawValue.slice(3)}`
              }
              if (rawValue.length > 6) {
                formattedValue = `${formattedValue.slice(0, 7)}.${rawValue.slice(6)}`
              }
              if (rawValue.length > 9) {
                formattedValue = `${formattedValue.slice(0, 11)}-${rawValue.slice(9)}`
              }
          
              if (rawValue.length <= 11) {
                setNewContact({ ...newContact, cpf: formattedValue })
              }
            }}
            inputProps={{
              maxLength: 14,
            }}
          />
          {!validateCPF(newContact.cpf) && newContact.cpf !== "" && (
            <Typography color="error" variant="caption">
              CPF inválido
            </Typography>
          )}
          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value.replace(/[^0-9]/g, "") })}
          />
          <TextField
            label="CEP"
            fullWidth
            margin="normal"
            value={newContact.address.cep}
            onChange={(e) => handleCepChange(e.target.value.replace(/[^0-9]/g, ""))}
            inputProps={{
              maxLength: 8,
            }}
          />
          <TextField
            label="Estado"
            fullWidth
            margin="normal"
            value={newContact.address.state}
            disabled
          />
          <TextField
            label="Cidade"
            fullWidth
            margin="normal"
            value={newContact.address.city}
            disabled
          />
          <TextField
            label="Bairro"
            fullWidth
            margin="normal"
            value={newContact.address.neighborhood}
            disabled
          />
          <TextField
            label="Rua"
            fullWidth
            margin="normal"
            value={newContact.address.street}
            disabled
          />
          <TextField
            label="Número"
            fullWidth
            margin="normal"
            value={newContact.address.number}
            onChange={(e) => setNewContact({ ...newContact, address: { ...newContact.address, number: e.target.value } })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelContact} color="error">
            Cancelar
          </Button>
          <Button onClick={handleAddContact} color="success">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Home
