import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


export default function SignInScreen({ onBack }: any) {
  // Use States for Login and Registration
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[k:string]: string}>({}); // uses :string to only allow string keys

    const validate = () => {
    let valid = true;
    let newErrors: { [k: string]: string } = {};

    if(!firstName && isRegistering) {
        newErrors.firstName = "First name is required";
        valid = false;
    } 

    if(!lastName && isRegistering){
        newErrors.lastName = "Last name is required";
        valid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

// Handle Submit for Main Login Button
   const LogInHandleSumbmit = () => {
    if (validate()) {
      // You can call your login API here
      console.log("Logging in with:", { email, password });
      router.push('/'); // Navigate back to Home Page
    }
  };
  // Handle Submit for Register Button 
  const registerHandleSubmit = () => {
    // Not sure About this part
    if (isRegistering) {
      console.log('Register:', { firstName, lastName, email, password });
    } else {
      console.log('Login:', { email, password });
    }
    // Navigate back to Home after Login/Register
    router.push('/'); 
  };

  // Handles Registering Button
  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };

 

  // Titles and Button Titles
  let titleText = 'Welcome Back';
  let subtitleText = 'Login to continue your adventure';
  let buttonText = 'Login';
  let switchText = "Don't have an account? Register";

  
  if (isRegistering) {
    titleText = 'Create Account';
    subtitleText = 'Join the gamers paradise!';
    buttonText = 'Register';
    switchText = 'Already have an account? Login';
  }


  return (
    <View style={styles.signInContainer}>
      <Text style={styles.logo}>GameStart</Text>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>


      {/* First Name and Last Name Inputs in Registration page */}
      {isRegistering && (
        <>
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={setFirstName}
          />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={setLastName}
          />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </>
      )}

      {/* Email Input */}
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
       {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}


      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={LogInHandleSumbmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {/* "Already have an account? Login" Button */}
      <TouchableOpacity onPress={handleSwitch}>
        <Text style={styles.switchText}>{switchText}</Text>
      </TouchableOpacity>

      {/* Main Login Button*/}
      <TouchableOpacity onPress={() => router.push('/')}> 
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    color: '#00ffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    color: '#00ffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    width: '50%',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  button: {
    backgroundColor: '#00ffff',
    borderRadius: 8,
    width: '50%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#00ffff',
    marginTop: 15,
    fontSize: 14,
  },
  backText: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});