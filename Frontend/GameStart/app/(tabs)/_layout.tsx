import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


export default function SignInScreen({ onBack }: any) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    if (isRegistering) {
      console.log('Register:', { firstName, lastName, email, password });
    } else {
      console.log('Login:', { email, password });
    }
  };


  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };


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


      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={setLastName}
          />
        </>
      )}


      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />


      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleSwitch}>
        <Text style={styles.switchText}>{switchText}</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={onBack}>
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
});