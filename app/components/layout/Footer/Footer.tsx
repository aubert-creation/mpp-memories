import Box from '@components/core/Box';

const FOOTER_MIN_HEIGHT = 229;

const Footer = () => {
  return (
    <Box minHeight={FOOTER_MIN_HEIGHT} p={8} justifyContent="space-between" bg="primary">
      <Box justifyContent="center" flex={1} />
    </Box>
  );
};

export default Footer;
