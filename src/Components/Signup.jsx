import React from 'react';
import { Box, FormControl, FormLabel, Input, Button,useToast,FormErrorMessage, Select } from '@chakra-ui/react';
import { Formik, Field  } from "formik";
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

export const Signup = () => {
   
    const toast = useToast();
    const navigate = useNavigate();

    const handleSignUp = async ({name,age,gender,role,email,password}) => {
        try {
            let res = await fetch('https://int-signup-login.herokuapp.com/createuser', {
                method: "POST",
                body: JSON.stringify({ name, age,role, gender, email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await res.json();
            if (data.message)
                toast({
                    title: 'Email already Exist',
                    description: "User already exist with this email ID",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            else {
                toast({
                    title: 'Account created',
                    description: "Account created successfully going to login Page",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('../login');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box width="600px" margin="50px auto" backgroundColor="#adf7c1" padding="40px" borderRadius="10px">
            <Formik initialValues={{name: "",
        age: 0,
        gender: "male",
        role:"developer",
        email: "",
        password: ""}} onSubmit={(values)=>{handleSignUp(values)}} validationSchema={Yup.object({
            name:Yup.string().required('Required'),
            age:Yup.number().min(1,"Age must be greater than 0").required('Required'),
            email: Yup.string().email().required('Required'),
            password:Yup.string().required('Required'),
        })}>
            {({handleSubmit,errors,touched})=>{

            return (
                
                <form onSubmit={handleSubmit}>
                <FormControl padding="20px 0px" isInvalid={errors.name && touched.name}>
                    <FormLabel>Name</FormLabel>
                    <Field type="text" name="name" placeholder='Enter name' variant="filled" as={Input}/>
                    
                </FormControl>
                <FormControl padding="20px 0px" isInvalid={errors.age && touched.age}>
                    <FormLabel>Age</FormLabel>
                    <Field type="number" name="age" placeholder='Enter age' as={Input} variant="filled" />
                    <FormErrorMessage>{errors.age}</FormErrorMessage>
                   
                </FormControl>
                <FormControl padding="20px 0px">
                    <FormLabel>Gender</FormLabel>
                    {/* <RadioGroup value={gender} name="gender">
                        <Stack spacing="5" direction="row">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Stack>
                    </RadioGroup>  */}
                    <FormLabel><Field type="radio" name="gender" value="male" />
                    Male</FormLabel>
                    <FormLabel><Field type="radio" name="gender" value="female"  />
                    female</FormLabel>
                </FormControl>
                <FormControl padding="20px 0px">
                    <FormLabel>Role</FormLabel>
                    <Field name="role"  as={Select} variant="filled" >
                        <option value="developer">Developer</option>
                        <option value="project manager">Project Manager</option>
                        <option value="team lead">Team Lead</option>
                    </Field>
                </FormControl>
                <FormControl padding="20px 0px" isInvalid={errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} variant="filled" type="text" name="email" placeholder='Enter email' />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl padding="20px 0px" isInvalid={errors.password && touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Field as={Input} variant="filled" type="password" name="password" placeholder='Enter password' />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
    
                </FormControl>
                <Button colorScheme="blue" type="submit">Sign Up</Button>
                </form>
            
            )}}
            </Formik>
        </Box>
    )
}