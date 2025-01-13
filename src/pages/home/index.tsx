import { useState, useEffect } from 'react'
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Box, Checkbox } from '@mui/material'
import api from '../../lib/axios'
import { IContact } from '../../interfaces/iContact'
import { toast } from 'react-toastify'
import { useAuthentication } from '../../context/authenticationContext'

const Home = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
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

  const handleAddContact = () => {
    if (contacts.find((contact) => contact.cpf === newContact.cpf)) {
      toast.error('Já existe um contato cadastrado com este CPF!')
      return
    }

    const updateListContacts = [...contacts, { ...newContact, id: crypto.randomUUID(), userId: user?.id || '' }]
    setContacts(updateListContacts)
    localStorage.setItem('contacts', JSON.stringify(updateListContacts))
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
    setOpenDialog(false)
  }

  const handleSelectContact = (id: string) => {
    setSelectedContactId((prev) => (prev === id ? null : id))
  }

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
    if (selectedContactId === id) setSelectedContactId(null)
    toast.success('Contato excluído com sucesso!')
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Lista de Contatos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Adicionar Contato
      </Button>
      <Box marginTop={3}>
        {!!contacts.length && contacts.map((contact, index) => (
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
              checked={selectedContactId === contact.id}
              onChange={() => handleSelectContact(contact.id)}
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
              onClick={() => handleDeleteContact(contact.id)}
              sx={{ marginTop: 2 }}
            >
              Excluir
            </Button>
          </Box>
        ))}
      </Box>

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
            onChange={(e) => setNewContact({ ...newContact, cpf: e.target.value })}
          />
          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
          <TextField
            label="CEP"
            fullWidth
            margin="normal"
            value={newContact.address.cep}
            onChange={(e) => handleCepChange(e.target.value)}
          />
          <TextField
            label="Estado"
            fullWidth
            margin="normal"
            value={newContact.address.state}
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
            label="Cidade"
            fullWidth
            margin="normal"
            value={newContact.address.city}
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
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddContact} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Home
