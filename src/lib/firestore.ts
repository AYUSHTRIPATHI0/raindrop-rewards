import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  updateDoc,
  runTransaction,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
}

export interface Post {
  id?: string;
  content: string;
  user: {
    uid: string;
    name: string;
    avatar: string;
  };
  createdAt: Timestamp;
  likes: number;
}

export interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
}

export interface DiyGuide {
  id: string;
  title: string;
  description: string;
  steps: string[];
  points: number;
}


export const createUserProfile = async (uid: string, data: Omit<UserProfile, 'uid' | 'points' | 'avatar'>) => {
  await setDoc(doc(db, 'users', uid), { 
    ...data,
    uid,
    points: 0,
    avatar: `https://placehold.co/100x100.png`
  });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, data);
};

export const updateUserPoints = async (uid: string, points: number) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { points });
};

export const createPost = async (postData: Omit<Post, 'id'>) => {
  await addDoc(collection(db, 'posts'), postData);
};

export const getPosts = async (callback: (posts: Post[]) => void) => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });
    callback(posts);
  });
  return unsubscribe;
};

export const likePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  const likeRef = doc(db, 'posts', postId, 'likes', userId);

  await runTransaction(db, async (transaction) => {
    // Read all documents first.
    const postDoc = await transaction.get(postRef);
    const likeDoc = await transaction.get(likeRef);

    if (!postDoc.exists()) {
      throw "Post does not exist!";
    }

    const currentLikes = postDoc.data().likes || 0;

    // Now, perform writes.
    if (likeDoc.exists()) {
      // User has already liked, so unlike.
      transaction.update(postRef, { likes: currentLikes - 1 });
      transaction.delete(likeRef);
    } else {
      // User has not liked, so like.
      transaction.update(postRef, { likes: currentLikes + 1 });
      transaction.set(likeRef, { userId });
    }
  });
};

export const getLeaderboardUsers = async (): Promise<UserProfile[]> => {
    const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    return users;
};

export const getTutorialVideos = async (): Promise<TutorialVideo[]> => {
    // In a real app, this would fetch from Firestore. For now, returning mock data.
    return [
      { id: '1', title: 'Simple Rain Barrel Setup', description: 'A quick guide to setting up your first rain barrel.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: '2', title: 'Advanced Diverter Installation', description: 'Learn how to install an advanced diverter system.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ];
};
  
export const getDiyGuides = async (): Promise<DiyGuide[]> => {
    // In a real app, this would fetch from Firestore. For now, returning mock data.
    return [
      { id: '1', title: 'Build a 5-Gallon Bucket Harvester', description: 'An easy, low-cost system perfect for beginners.', steps: ['Get a food-grade bucket.', 'Drill a hole for a spigot.', 'Install spigot with sealant.', 'Place under a downspout.'], points: 50 },
      { id: '2', title: 'First Flush Diverter DIY', description: 'Improve water quality by diverting the first few minutes of rain.', steps: ['Cut PVC pipe.', 'Assemble T-junctions.', 'Add a cap with a small hole.', 'Install in your downspout line.'], points: 150 }
    ];
};
