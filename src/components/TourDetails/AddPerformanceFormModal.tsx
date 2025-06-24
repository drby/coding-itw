import { type ChangeEvent,useState, type FC } from 'react';

import {
  Button,
  Input,
  Box,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toast-utils';
import type { Performance } from '@/types';

interface AddPerformanceFormModalProps {
  open: boolean;
  onClose: () => void;
  onAddPerformance: (performance: Omit<Performance, 'id'>) => void;
  tourId: string | number;
}

const AddPerformanceFormModal: FC<AddPerformanceFormModalProps> = ({
  open,
  onClose,
  onAddPerformance,
}) => {
  const [formData, setFormData] = useState({
    date: '',
    city: '',
    venue: '',
    capacity: '',
    ticketPrice: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.city) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.venue) {
      newErrors.venue = 'Le lieu est requis';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'La capacité est requise';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'La capacité doit être un nombre positif';
    }

    if (!formData.ticketPrice) {
      newErrors.ticketPrice = 'Le prix du billet est requis';
    } else if (isNaN(Number(formData.ticketPrice)) || Number(formData.ticketPrice) < 0) {
      newErrors.ticketPrice = 'Le prix du billet doit être un nombre positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newPerformance: Omit<Performance, 'id'> = {
        date: formData.date,
        city: formData.city,
        venue: formData.venue,
        capacity: Number(formData.capacity),
        ticketPrice: Number(formData.ticketPrice),
        ticketsSold: 0,
      };

      onAddPerformance(newPerformance);

      toaster.create({
        title: 'Représentation ajoutée',
        description: `${formData.city} le ${new Date(formData.date).toLocaleDateString('fr-FR')}`,
        status: 'success',
        duration: 5000,
        closable: true
      });

      setFormData({
        date: '',
        city: '',
        venue: '',
        capacity: '',
        ticketPrice: '',
      });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0,0,0,0.5)"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        borderRadius="md"
        maxW="500px"
        w="90%"
        p={5}
        position="relative"
      >
        <Button
          position="absolute"
          top="10px"
          right="10px"
          size="sm"
          onClick={onClose}
        >
          ✕
        </Button>

        <Heading size="md" mb={4}>Ajouter une représentation</Heading>

        <Box gap="16px" display="flex" flexDirection="column">
          <Box>
            <Text mb={1} fontWeight="medium">Date</Text>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <Text color="red.500" fontSize="sm">{errors.date}</Text>}
          </Box>

          <Box>
            <Text mb={1} fontWeight="medium">Ville</Text>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Paris"
            />
            {errors.city && <Text color="red.500" fontSize="sm">{errors.city}</Text>}
          </Box>

          <Box>
            <Text mb={1} fontWeight="medium">Lieu</Text>
            <Input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Théâtre de la Ville"
            />
            {errors.venue && <Text color="red.500" fontSize="sm">{errors.venue}</Text>}
          </Box>

          <Box>
            <Text mb={1} fontWeight="medium">Capacité</Text>
            <Input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="500"
            />
            {errors.capacity && <Text color="red.500" fontSize="sm">{errors.capacity}</Text>}
          </Box>

          <Box>
            <Text mb={1} fontWeight="medium">Prix du billet (€)</Text>
            <Input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              placeholder="25"
            />
            {errors.ticketPrice && <Text color="red.500" fontSize="sm">{errors.ticketPrice}</Text>}
          </Box>
        </Box>

        <Flex mt={6} justifyContent="flex-end">
          <Button variant="outline" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button colorPalette="teal" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AddPerformanceFormModal;
