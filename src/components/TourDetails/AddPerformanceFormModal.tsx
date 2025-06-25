import { type FC } from 'react';

import {
  Button,
  Input,
  Box,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/utils/toast-utils';
import type { Performance } from '@/types';
import { useForm } from '@/hooks/useForm';
import { validatePerformanceForm, type PerformanceForm } from '@/components/TourDetails/forms/performanceForm';

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
  const initialFormData: PerformanceForm = {
    date: '',
    city: '',
    venue: '',
    capacity: '',
    ticketPrice: '',
  };

  const {
    values,
    getError,
    handleChange,
    handleBlur,
    validateAll,
    resetForm
  } = useForm(initialFormData, validatePerformanceForm);

  const handleSubmit = () => {
    if (validateAll()) {
      const newPerformance: Omit<Performance, 'id'> = {
        date: values.date,
        city: values.city,
        venue: values.venue,
        capacity: Number(values.capacity),
        ticketPrice: Number(values.ticketPrice),
        ticketsSold: 0,
      };

      onAddPerformance(newPerformance);

      toaster.create({
        title: 'Représentation ajoutée',
        description: `${values.city} le ${new Date(values.date).toLocaleDateString('fr-FR')}`,
        status: 'success',
        duration: 5000,
        closable: true
      });

      resetForm();
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
      bg="rgba(0,0,0,0.7)"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        color="gray.800"
        borderRadius="md"
        maxW="500px"
        w="90%"
        p={5}
        position="relative"
        boxShadow="xl"
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

        <Heading size="md" mb={4} color="gray.800">Ajouter une représentation</Heading>

        <Box gap="16px" display="flex" flexDirection="column">
          <Box mb={4}>
            <Text mb={1} fontWeight="medium" color="gray.700">Date</Text>
            <Input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={() => handleBlur('date')}
              borderColor={getError('date') ? 'red.500' : undefined}
            />
            {getError('date') && (
              <Text color="red.500" fontSize="sm" mt={1}>{getError('date')}</Text>
            )}
          </Box>

          <Box mb={4}>
            <Text mb={1} fontWeight="medium" color="gray.700">Ville</Text>
            <Input
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={() => handleBlur('city')}
              placeholder="Paris"
              borderColor={getError('city') ? 'red.500' : undefined}
            />
            {getError('city') && (
              <Text color="red.500" fontSize="sm" mt={1}>{getError('city')}</Text>
            )}
          </Box>

          <Box mb={4}>
            <Text mb={1} fontWeight="medium" color="gray.700">Lieu</Text>
            <Input
              name="venue"
              value={values.venue}
              onChange={handleChange}
              onBlur={() => handleBlur('venue')}
              placeholder="Théâtre de la Ville"
              borderColor={getError('venue') ? 'red.500' : undefined}
            />
            {getError('venue') && (
              <Text color="red.500" fontSize="sm" mt={1}>{getError('venue')}</Text>
            )}
          </Box>

          <Box mb={4}>
            <Text mb={1} fontWeight="medium" color="gray.700">Capacité</Text>
            <Input
              type="number"
              name="capacity"
              value={values.capacity}
              onChange={handleChange}
              onBlur={() => handleBlur('capacity')}
              placeholder="500"
              borderColor={getError('capacity') ? 'red.500' : undefined}
            />
            {getError('capacity') && (
              <Text color="red.500" fontSize="sm" mt={1}>{getError('capacity')}</Text>
            )}
          </Box>

          <Box mb={4}>
            <Text mb={1} fontWeight="medium" color="gray.700">Prix du billet (€)</Text>
            <Input
              type="number"
              name="ticketPrice"
              value={values.ticketPrice}
              onChange={handleChange}
              onBlur={() => handleBlur('ticketPrice')}
              placeholder="25"
              borderColor={getError('ticketPrice') ? 'red.500' : undefined}
            />
            {getError('ticketPrice') && (
              <Text color="red.500" fontSize="sm" mt={1}>{getError('ticketPrice')}</Text>
            )}
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
