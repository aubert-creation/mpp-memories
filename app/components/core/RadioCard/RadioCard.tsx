import Box from '@components/core/Box';
import BoxButton from '@components/core/BoxButton';
import type { IconType } from '@components/core/Icon/Icon';
import Icon from '@components/core/Icon/Icon';
import Radio from '@components/core/Radio/Radio';
import Typo from '@components/core/Typo';

const WIDTH = 480;

type RadioCardProps = {
  title?: string;
  isSelected: boolean;
  subTitle?: string;
  onChange: () => void;
  icon: IconType;
};

const RadioCard = ({ title, isSelected, subTitle, onChange, icon }: RadioCardProps) => (
  <BoxButton
    paddingX={4}
    paddingY={2}
    onClick={onChange}
    maxWidth={WIDTH}
    borderRadius="4px"
    bg={isSelected ? 'secondaryTrans.8' : 'white'}
    borderColor={isSelected ? 'secondary' : 'white'}
    borderStyle="solid"
    borderWidth={1}
  >
    <Box flexDirection="row" alignItems="center" justifyContent="center">
      <Box alignItems="flex-start" flexDirection="column">
        <Box flexDirection="row">
          <Icon type={icon} />
          <Typo variant="bodyStrong" ml={2} color={isSelected ? 'secondary' : 'font.dark'} mb={1}>
            {title}
          </Typo>
        </Box>
        <Typo variant="body" mr={4} textAlign="left" color="font.medium">
          {subTitle}
        </Typo>
      </Box>
      <Radio checked={isSelected} />
    </Box>
  </BoxButton>
);

export default RadioCard;
