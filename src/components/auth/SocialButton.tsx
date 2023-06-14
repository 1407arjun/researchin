import { Button, ButtonProps, Center, Text } from '@chakra-ui/react'

export default function SocialButton({
  icon,
  label,
  colorScheme,
  variant,
  ...props
}: ButtonProps & {
  icon: React.ReactElement
  label: string
  colorScheme?: string
  variant?: string
}) {
  return (
    <Button
      w="full"
      maxW="md"
      {...props}
      variant={variant}
      leftIcon={icon}
      colorScheme={colorScheme}>
      <Center>
        <Text>Sign in with {label}</Text>
      </Center>
    </Button>
  )
}
