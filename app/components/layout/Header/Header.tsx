import Box from '@components/core/Box';

const NAVBAR_CONTENT_MAX_WIDTH = 1440;
export const NAVBAR_HEIGHT = 72;

const Header = () => {
  return (
    <Box bg="primary" justifyContent="center">
      <Box
        height={NAVBAR_HEIGHT}
        alignItems="center"
        maxWidth={NAVBAR_CONTENT_MAX_WIDTH}
        width="100%"
        justifyContent="space-between"
        px={5}
      />
    </Box>
  );
};

export default Header;
