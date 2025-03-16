<template>
    <div class="register-container">
        <div class="card">
            <div class="card-header">
                <h1>Register</h1>
                <p>Create an account to get started</p>
            </div>
            <div class="card-body">
                <form @submit.prevent="saveData">
                    <div class="form-group">
                        <label for="first-name">First Name</label>
                        <input type="text" v-model="student.firstName" name="first-name" id="first-name" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="last-name">Last Name</label>
                        <input type="text" v-model="student.lastName" name="last-name" id="last-name" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" v-model="student.email" name="email" id="email" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="student.password" name="password" id="password" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" v-model="student.confirmPassword" name="confirm-password" id="confirm-password" class="form-control">
                    </div>
                    
                    <input type="submit" value="Register" class="btn btn-success">
                    
                    <p class="login-link">Already have an account? <a href="/login">Login here</a></p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Register',
    setup() {
        const router = useRouter();
        const student = reactive({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user' // Luôn đặt role là "user"
        });

        const saveData = async () => {
            if (student.password !== student.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    name: student.firstName + " " + student.lastName,
                    email: student.email,
                    password: student.password,
                    password_confirmation: student.confirmPassword,
                    role: student.role // Gửi role lên server
                });
                console.log(data);
                alert("Registered successfully");
                router.push('/login'); // Chuyển hướng đến trang Login
            } catch (error) {
                console.error("Error response:", error.response);
                if (error.response && error.response.data.errors) {
                    let messages = Object.values(error.response.data.errors).flat().join("\n");
                    alert("Failed to register: " + messages);
                } else {
                    alert("Failed to register: Unknown error");
                }
            }
        };

        onMounted(() => {
            console.log("mounted() called...");
        });

        return { student, saveData };
    }
}
</script>


<style lang="scss" scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    width: 100%;
    padding: 20px;
}

.card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
    text-align: center;
}

.card-header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.card-body p {
    font-size: 0.9rem;
    color: #6c757d;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: border-color 0.3s;
    
    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
}

.btn-success {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #218838;
    }
}

.login-link {
    margin-top: 15px;
    font-size: 0.9rem;
}

.login-link a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

@media (max-width: 600px) {
    .register-container {
        height: auto;
        padding: 40px 20px;
    }

    .card {
        padding: 15px;
    }

    .card-header {
        font-size: 1.2rem;
    }

    .form-control {
        padding: 8px;
    }

    .btn-success {
        padding: 8px;
        font-size: 0.9rem;
    }
}
</style>

