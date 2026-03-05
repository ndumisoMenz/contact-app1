import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    useToast,
    Spinner,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";
import { useAuthStore } from "../store/auth";

interface User {
    _id: string;
    username: string;
    role: string;
}

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();
    const toast = useToast();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const bgColor = useColorModeValue("white", "gray.700");
    const outerBg = useColorModeValue("gray.100", "gray.900");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(data);
            } else {
                throw new Error(data.message || "Failed to fetch users");
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();
            if (res.ok) {
                toast({
                    title: "Success",
                    description: "User role updated",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
            } else {
                throw new Error(data.message || "Failed to update role");
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg={outerBg}>
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box minH="100vh" bg={outerBg} py={10}>
            <Container maxW="container.lg">
                <Box bg={bgColor} p={8} rounded="lg" shadow="md">
                    <Heading mb={6}>User Management</Heading>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Username</Th>
                                <Th>Current Role</Th>
                                <Th>Update Role</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => (
                                <Tr key={user._id}>
                                    <Td>{user.username}</Td>
                                    <Td>
                                        <Select
                                            size="sm"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            w="150px"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </Select>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminPage;
