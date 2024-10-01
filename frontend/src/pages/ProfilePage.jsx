import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";


const ProfilePage = () => {

  const { user, logout } = useAuthStore();

  function handleLogOut() {
    logout();
  }


  return (
    <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
    <Card align='center'>
  <CardHeader>
    <Heading size='md'> Profil Info</Heading>
  </CardHeader>
  <CardBody>
    <Text>Nama : {user.name}</Text>
    <Text>Email : {user.email}</Text>
  </CardBody>
  <CardFooter>
  <Link to={'/'}>
    <Button colorScheme='blue'>
      Homepage
      </Button>
      </Link> 
      <Button marginLeft={10} colorScheme='red' onClick={handleLogOut}>
      Log Out
      </Button> 
  </CardFooter>
</Card>
    </Box>

  )
}

export default ProfilePage