import { type FC, type ChangeEvent } from 'react';

import { Box, Input } from "@chakra-ui/react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <Box flex="1">
      <Input
        placeholder="Rechercher une tournée..."
        value={searchQuery}
        onChange={onSearchChange}
      />
    </Box>
  );
};

export default SearchBar;
