import React from 'react';
import { Box, Button, Heading ,Table,Thead,Tr,Th,Tbody,Td} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Details = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    const [userData,setUserData]=React.useState([]);
    const [isProjectManager,setIsProjectManager]=React.useState(false);
    
        async function getUser(token) {
        try {
            let res = await fetch('https://int-signup-login.herokuapp.com/getuser', {
                method: "GET",
                headers: {
                    token
                }
            });
            res = await res.json();
            console.log(res);
            setData(res);
            if(res.role==="project manager"){
                console.log("Hello");
                setIsProjectManager(true);
                getUsersData(token);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('intechnology');
       
        navigate("/login");
    }
    const getUsersData=async(token)=>{
        try {
            let res = await fetch('https://int-signup-login.herokuapp.com/getall', {
                method: "GET",
                headers: {
                    token
                }
            });
            res = await res.json();
            console.log(res);
            setUserData(res);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        let token=localStorage.getItem('intechnology');
        
        if (!token)
            navigate("/login");
        else {
            getUser(token);
        }
    }, []);
    return (
        <>
            <Box width="40%" margin="40px auto" position="relative">
            <Button position="absolute" right="0" top="0" colorScheme="red" onClick={handleLogout}>Logout</Button>
            <Heading size="lg" color="#256D85">{`Name:    ${data.name}`}</Heading>
            <Heading size="lg" color="#256D85">{`Age:    ${data.age}`}</Heading>
            <Heading size="lg" color="#256D85">{`Gender:    ${data.gender}`}</Heading>
            <Heading size="lg" color="#256D85">{`Role:    ${data.role}`}</Heading>
            <Heading size="lg" color="#256D85">{`Email:    ${data.email}`}</Heading>
            
        </Box>
        {isProjectManager && <Box width="80%" margin="40px auto">
            <Table colorScheme="facebook" variant="striped" >
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Age</Th>
                        <Th>Gender</Th>
                        <Th>Role</Th>
                        <Th>Email</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userData.map((ele, index) => {
                        return (<Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{ele.name}</Td>
                            <Td>{ele.age}</Td>
                            <Td>{ele.gender}</Td>
                            <Td>{ele.role}</Td>
                            <Td>{ele.email}</Td>
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </Box>}
        </>
    )
}