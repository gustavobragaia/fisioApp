   # FisioApp - Physiotherapy Exercise Application

A React Native Expo application for physiotherapy exercise recommendations and pain management.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Database Setup](#database-setup)
   - [SQLite Implementation](#sqlite-implementation)
   - [Firebase Implementation](#firebase-implementation)
   - [Data Models](#data-models)
6. [API Integration](#api-integration)
7. [Styling with NativeWind](#styling-with-nativewind)
8. [Navigation](#navigation)
9. [Contributing](#contributing)

## Project Overview

FisioApp is a mobile application designed to help users manage pain and receive personalized physiotherapy exercise recommendations. The app features a pain assessment questionnaire that collects information about the user's pain symptoms and provides tailored exercise recommendations.

### Key Features

- Pain assessment questionnaire
- Personalized exercise recommendations
- Exercise demonstration videos
- Exercise tracking with timers
- Categorized exercise groups

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: React Native Paper
- **Media**: Expo AV for video playback
- **External API**: n8n for data processing

## Project Structure

```
fisioApp/
├── api/                  # API integration
│   └── handlePainSendSymptomsToN8n.ts
├── app/                  # Application screens (Expo Router)
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── (triagem)/    # Screening/assessment screens
│   │   │   ├── triagem.tsx
│   │   │   ├── diagnostic-ideal.tsx
│   │   │   ├── exercise-group.tsx
│   │   │   └── single-exercise.tsx
│   │   └── _layout.tsx   # Tab navigation layout
├── assets/               # Images, fonts, and other static assets
├── components/           # Reusable UI components
│   ├── FormPainSymptoms.tsx
│   ├── ResultDiagnostic.tsx
│   ├── ExerciseGroupList.tsx
│   └── ui/               # Basic UI components
├── styles/               # Global styles
│   └── colors.ts         # Color definitions
├── types/                # TypeScript type definitions
├── database/             # Database configuration and models (to be implemented)
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## Getting Started

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd fisioApp
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your preferred platform
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## Database Setup

The application currently uses API calls to n8n for data processing but does not have a local database implementation. Below are detailed instructions for implementing database solutions.

### SQLite Implementation

SQLite is a lightweight, file-based database that works well for mobile applications. Here's how to set it up:

1. Install required packages
   ```bash
   npm install expo-sqlite
   ```

2. Create a database folder structure
   ```bash
   mkdir -p database/models
   mkdir -p database/migrations
   mkdir -p database/services
   ```

3. Create a database connection file at `database/connection.ts`:
   ```typescript
   import * as SQLite from 'expo-sqlite';

   export const getDatabase = () => {
     const db = SQLite.openDatabase('fisioapp.db');
     return db;
   };

   export const initDatabase = () => {
     const db = getDatabase();
     
     // Create tables
     db.transaction(tx => {
       // Users table
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS users (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           email TEXT UNIQUE,
           created_at INTEGER
         );`
       );
       
       // Pain assessments table
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS pain_assessments (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           user_id INTEGER,
           pain_location TEXT,
           pain_situation TEXT,
           pain_type TEXT,
           pain_start TEXT,
           pain_level TEXT,
           life_impact TEXT,
           goals TEXT,
           created_at INTEGER,
           FOREIGN KEY (user_id) REFERENCES users (id)
         );`
       );
       
       // Exercise categories table
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS exercise_categories (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT,
           description TEXT,
           type TEXT
         );`
       );
       
       // Exercises table
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS exercises (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           category_id INTEGER,
           name TEXT,
           description TEXT,
           image_url TEXT,
           video_url TEXT,
           duration TEXT,
           difficulty TEXT,
           FOREIGN KEY (category_id) REFERENCES exercise_categories (id)
         );`
       );
       
       // Exercise steps table
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS exercise_steps (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           exercise_id INTEGER,
           step_number INTEGER,
           description TEXT,
           FOREIGN KEY (exercise_id) REFERENCES exercises (id)
         );`
       );
       
       // User exercise history
       tx.executeSql(
         `CREATE TABLE IF NOT EXISTS exercise_history (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           user_id INTEGER,
           exercise_id INTEGER,
           completed_at INTEGER,
           duration INTEGER,
           FOREIGN KEY (user_id) REFERENCES users (id),
           FOREIGN KEY (exercise_id) REFERENCES exercises (id)
         );`
       );
     });
   };
   ```

4. Create model files for each entity in the `database/models` directory:

   **User Model (`database/models/User.ts`):**
   ```typescript
   import { getDatabase } from '../connection';

   export interface User {
     id?: number;
     name: string;
     email: string;
     created_at?: number;
   }

   export const createUser = (user: User): Promise<User> => {
     return new Promise((resolve, reject) => {
       const db = getDatabase();
       const now = Date.now();
       
       db.transaction(tx => {
         tx.executeSql(
           'INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)',
           [user.name, user.email, now],
           (_, result) => {
             resolve({
               ...user,
               id: result.insertId,
               created_at: now
             });
           },
           (_, error) => {
             reject(error);
             return false;
           }
         );
       });
     });
   };

   export const getUserById = (id: number): Promise<User | null> => {
     return new Promise((resolve, reject) => {
       const db = getDatabase();
       
       db.transaction(tx => {
         tx.executeSql(
           'SELECT * FROM users WHERE id = ?',
           [id],
           (_, result) => {
             if (result.rows.length > 0) {
               resolve(result.rows.item(0));
             } else {
               resolve(null);
             }
           },
           (_, error) => {
             reject(error);
             return false;
           }
         );
       });
     });
   };
   ```

   **Pain Assessment Model (`database/models/PainAssessment.ts`):**
   ```typescript
   import { getDatabase } from '../connection';

   export interface PainAssessment {
     id?: number;
     user_id: number;
     pain_location: string;
     pain_situation: string;
     pain_type: string;
     pain_start: string;
     pain_level: string;
     life_impact: string;
     goals: string;
     created_at?: number;
   }

   export const createPainAssessment = (assessment: PainAssessment): Promise<PainAssessment> => {
     return new Promise((resolve, reject) => {
       const db = getDatabase();
       const now = Date.now();
       
       db.transaction(tx => {
         tx.executeSql(
           `INSERT INTO pain_assessments (
             user_id, pain_location, pain_situation, pain_type, 
             pain_start, pain_level, life_impact, goals, created_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
           [
             assessment.user_id,
             assessment.pain_location,
             assessment.pain_situation,
             assessment.pain_type,
             assessment.pain_start,
             assessment.pain_level,
             assessment.life_impact,
             assessment.goals,
             now
           ],
           (_, result) => {
             resolve({
               ...assessment,
               id: result.insertId,
               created_at: now
             });
           },
           (_, error) => {
             reject(error);
             return false;
           }
         );
       });
     });
   };

   export const getPainAssessmentsByUserId = (userId: number): Promise<PainAssessment[]> => {
     return new Promise((resolve, reject) => {
       const db = getDatabase();
       
       db.transaction(tx => {
         tx.executeSql(
           'SELECT * FROM pain_assessments WHERE user_id = ? ORDER BY created_at DESC',
           [userId],
           (_, result) => {
             const assessments: PainAssessment[] = [];
             for (let i = 0; i < result.rows.length; i++) {
               assessments.push(result.rows.item(i));
             }
             resolve(assessments);
           },
           (_, error) => {
             reject(error);
             return false;
           }
         );
       });
     });
   };
   ```

5. Initialize the database in your app entry point (`app/_layout.tsx`):
   ```typescript
   import { useEffect } from 'react';
   import { initDatabase } from '../database/connection';

   export default function RootLayout() {
     useEffect(() => {
       initDatabase();
     }, []);

     // Rest of your layout component
   }
   ```

### Firebase Implementation

For a cloud-based solution with real-time capabilities, Firebase is an excellent choice:

1. Install required packages
   ```bash
   npm install firebase @react-native-firebase/app @react-native-firebase/firestore
   ```

2. Create a Firebase project at [firebase.google.com](https://firebase.google.com)

3. Create a configuration file at `database/firebase.ts`:
   ```typescript
   import firebase from 'firebase/app';
   import 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   // Initialize Firebase
   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }

   export const firestore = firebase.firestore();
   export default firebase;
   ```

4. Create model files for Firestore:

   **User Model (`database/models/FirestoreUser.ts`):**
   ```typescript
   import { firestore } from '../firebase';

   export interface User {
     id?: string;
     name: string;
     email: string;
     createdAt: firebase.firestore.Timestamp;
   }

   export const usersCollection = firestore.collection('users');

   export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
     const userWithTimestamp = {
       ...user,
       createdAt: firebase.firestore.Timestamp.now()
     };
     
     const docRef = await usersCollection.add(userWithTimestamp);
     return {
       ...userWithTimestamp,
       id: docRef.id
     };
   };

   export const getUserById = async (id: string): Promise<User | null> => {
     const doc = await usersCollection.doc(id).get();
     if (!doc.exists) return null;
     
     return {
       id: doc.id,
       ...doc.data()
     } as User;
   };
   ```

   **Pain Assessment Model (`database/models/FirestorePainAssessment.ts`):**
   ```typescript
   import { firestore } from '../firebase';

   export interface PainAssessment {
     id?: string;
     userId: string;
     painLocation: string;
     painSituation: string;
     painType: string;
     painStart: string;
     painLevel: string;
     lifeImpact: string;
     goals: string;
     createdAt: firebase.firestore.Timestamp;
   }

   export const painAssessmentsCollection = firestore.collection('painAssessments');

   export const createPainAssessment = async (
     assessment: Omit<PainAssessment, 'id' | 'createdAt'>
   ): Promise<PainAssessment> => {
     const assessmentWithTimestamp = {
       ...assessment,
       createdAt: firebase.firestore.Timestamp.now()
     };
     
     const docRef = await painAssessmentsCollection.add(assessmentWithTimestamp);
     return {
       ...assessmentWithTimestamp,
       id: docRef.id
     };
   };

   export const getPainAssessmentsByUserId = async (userId: string): Promise<PainAssessment[]> => {
     const snapshot = await painAssessmentsCollection
       .where('userId', '==', userId)
       .orderBy('createdAt', 'desc')
       .get();
     
     return snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     })) as PainAssessment[];
   };
   ```

### Data Models

The database should include the following data models:

1. **User**
   - id (primary key)
   - name
   - email
   - created_at

2. **PainAssessment**
   - id (primary key)
   - user_id (foreign key to User)
   - pain_location
   - pain_situation
   - pain_type
   - pain_start
   - pain_level
   - life_impact
   - goals
   - created_at

3. **ExerciseCategory**
   - id (primary key)
   - name
   - description
   - type

4. **Exercise**
   - id (primary key)
   - category_id (foreign key to ExerciseCategory)
   - name
   - description
   - image_url
   - video_url
   - duration
   - difficulty

5. **ExerciseStep**
   - id (primary key)
   - exercise_id (foreign key to Exercise)
   - step_number
   - description

6. **ExerciseHistory**
   - id (primary key)
   - user_id (foreign key to User)
   - exercise_id (foreign key to Exercise)
   - completed_at
   - duration

## API Integration

The application currently integrates with n8n for data processing. The API integration is handled in the `api/handlePainSendSymptomsToN8n.ts` file.

To modify the API endpoint or add new API integrations:

1. Update the API_URL constant in the existing file or create a new API handler file
2. Implement the necessary fetch calls with proper error handling
3. Process the response data as needed

Example of adding a new API handler for exercise recommendations:

```typescript
// api/getExerciseRecommendations.ts

const API_URL = 'https://fisioapplesgo.app.n8n.cloud';

export interface ExerciseRecommendation {
  name: string;
  description: string;
  type: string;
  imageUrl?: string;
  videoUrl?: string;
  steps: string[];
}

const getExerciseRecommendations = async (
  painLocation: string,
  painLevel: string
): Promise<ExerciseRecommendation[]> => {
  try {
    const apiResponse = await fetch(`${API_URL}/webhook/exercise-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        painLocation,
        painLevel,
      }),
    });

    if (!apiResponse.ok) {
      throw new Error('Error fetching exercise recommendations');
    }

    const data = await apiResponse.json();
    return data.recommendations || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default getExerciseRecommendations;
```

## Styling with NativeWind

The application uses NativeWind for styling, which brings Tailwind CSS to React Native. The color definitions are in the `styles/colors.ts` file and are integrated with Tailwind through the `tailwind.config.js` file.

To modify or extend the color palette:

1. Update the colors in `styles/colors.ts`:
   ```typescript
   const colors = {
     white: '#FFFFFF',
     black: '#000000',
     deepBlue: '#4A6FA5',
     lightBlue: '#AEE1F9',
     teal: '#CDEFE8',
     cream: '#F4F1EE',
     textPrimary: '#333333',
     textSecondary: '#666666',
     // Add your new colors here
   };

   export default colors;
   ```

2. Update the `tailwind.config.js` file to include the new colors:
   ```javascript
   const colors = require('./styles/colors');

   module.exports = {
     content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {
         colors: colors,
       },
     },
     plugins: [],
   };
   ```

## Navigation

The application uses Expo Router for navigation, which is a file-based routing system. The main navigation structure is defined in the `app/(tabs)/_layout.tsx` file.

To add a new screen:

1. Create a new file in the appropriate directory (e.g., `app/(tabs)/(triagem)/new-screen.tsx`)
2. Define your screen component
3. The screen will be automatically accessible via its file path (e.g., `/new-screen`)

To pass parameters between screens, use the `useRouter` and `useLocalSearchParams` hooks:

```typescript
// In the source screen
import { useRouter } from 'expo-router';

const SourceScreen = () => {
  const router = useRouter();
  
  const navigateToTarget = () => {
    router.push({
      pathname: '/target-screen',
      params: { id: '123', name: 'Example' }
    });
  };
  
  // ...
};

// In the target screen
import { useLocalSearchParams } from 'expo-router';

const TargetScreen = () => {
  const params = useLocalSearchParams<{ id: string; name: string }>();
  
  // Access params.id and params.name
  // ...
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
