// "use client";

// import { useState, Suspense } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/slices/authSlice';
// import axios from 'axios';
// import styles from "./page.module.css";
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { auth, googleProvider, signInWithPopup } from '../firebase/firebaseConfig';


// const SignInContent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const searchParams = useSearchParams();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const redirectPath = searchParams.get("redirect") || "/";  // Fallback to home if no redirect
//   const signInMessage = redirectPath === "/chatbox" 
//     ? "Sign In to open the chatbox" 
//     : "Sign In";


 
//     const handleGoogleSignIn = async () => {
//       try {
//         // Step 1: Sign in with Google and get the Firebase user token
//         const result = await signInWithPopup(auth, googleProvider);
//         const user = result.user;
    
//         // Get the Firebase token
//         const firebaseToken = await user.getIdToken();
    
//         // Step 2: Exchange the Firebase token with your backend
//         const response = await axios.post('https://gate-server-new.salmonsmoke-2ff84997.centralindia.azurecontainerapps.io/user/exchange-token', {
//           firebase_token: firebaseToken,
//         });
    
//         // Step 3: Extract the token and credits from the response
//         const { access_token, credits } = response.data;
    
//         // Step 4: Dispatch the Redux action to save the token and credits
//         dispatch(loginSuccess({ token:access_token, credits }));
    
//         // Step 5: Redirect the user to the appropriate path
//         router.push(redirectPath);
    
//         console.log('Google sign-in and backend exchange successful:', response.data);
//       } catch (err) {
//         console.error('Google sign-in error or backend exchange failed:', err);
//         setError('Google Sign-In failed. Please try again.');
//       }
//     };
    

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if(!agree) {
//         setError('Please agree to the Terms and Conditions.');
//         return;
//       }
//       const response = await axios.post('https://gate-server-new.salmonsmoke-2ff84997.centralindia.azurecontainerapps.io/user/login', {
//         email,
//         password,
//       });
  
//       const { access_token, credits } = response.data;
//       dispatch(loginSuccess({ token:access_token, credits }));
//       router.push(redirectPath);
  
//       console.log('Logged in successfully:', response.data);
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };
//   const [agree, setAgree] = useState(false);
  

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <h2 className={styles.title}>{signInMessage}</h2>
//         {error && <p className={styles.error}>{error}</p>}
//         {/* <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={`${styles.button} buttonWithGradient`}>Sign In</button> */}
//         <div className={styles.checkboxContainer}>
//           <input
//             type="checkbox"
//             id="agree"
//             checked={agree}
//             onChange={() => setAgree(!agree)}
//           />
//           <label htmlFor="agree" className={styles.checkboxLabel}>
//             I agree to the{" "}
//             <Link href="/termsandconditions" className={styles.termsLink}>
//               Terms and Conditions
//             </Link>
//           </label>
//         </div>
//         {!agree && <p className={styles.error}>Please agree to the Terms and Conditions.</p>}
//         <button
//           type="button"
//           disabled={!agree}
//           onClick={handleGoogleSignIn}
//           className={`${styles.button} buttonWithGradient`}
//         >
//           Sign In with Google
//            <img
//     src="https://www.google.com/favicon.ico"
//     alt="Google Logo"
//     className={styles.googleLogo}
//   />
//         </button>
//         {/* <p className={styles.smallPara}>Don&apos;t have an account? <Link className={styles.sinUpLink} href={"/signup"}>SIGNUP</Link></p> */}
//       </form>
//     </div>
//   );
// };

// const SignIn = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <SignInContent />
//     </Suspense>
//   );
// };

// export default SignIn;


// pages/index.tsx
"use client"
import styles from './login.module.css';

import { useState } from 'react';
import axios from 'axios';
const  SignIn = ()=> {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setErrors({ ...errors, terms: true });
      return;
    }
    
    let response = await axios.post("/api/login")
    console.log(response);

    console.log('Login attempted with:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className={styles.checkboxcontainer}
              checked={formData.termsAccepted}
              onChange={(e) => {
                setFormData({ ...formData, termsAccepted: e.target.checked });
                setErrors({ ...errors, terms: false });
              }}
            />
            <label htmlFor="terms" className="text-sm text-white">
              I agree to the Terms and Conditions
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-400 text-sm">Please agree to the Terms and Conditions.</p>
          )}

          <button
            type="submit"
            className={styles.button}
          >
            Sign In
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/20 w-full"></div>
            <span className="bg-transparent px-2 text-white/50 text-sm">or</span>
            <div className="border-t border-white/20 w-full"></div>
          </div>

          <button
            type="button"
            className={styles.googlebutton}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>
        </form>

        <p className="text-center text-white/50 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-white hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;