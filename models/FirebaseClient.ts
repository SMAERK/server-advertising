import firebaseAdmin, { auth, firestore } from 'firebase-admin';

type PathReferenceType = 'collection' | 'doc'

export class FirebaseClient {
    private static _instance: FirebaseClient;
    public static firestore: firestore.Firestore;
    public static auth: auth.Auth;
    public static firebase: FirebaseClient;
    private static _isInitialized: boolean = false;

    private constructor() {
        this.init();
    }

    private init() {
        // firebaseAdmin.initializeApp({
        //     credential: firebaseAdmin.credential.cert(environment.SERVICE_ACCOUNT)
        // });
        firebaseAdmin.initializeApp();

        FirebaseClient.firestore = firestore();
        FirebaseClient.auth = auth();

        FirebaseClient._isInitialized = true;
    }

    public static bootstrap() {
        if (!FirebaseClient._instance) {
            FirebaseClient._instance = new FirebaseClient();
        }
        return FirebaseClient._instance;
    }

    private validateInitialization() {
        if (!FirebaseClient._isInitialized) {
            throw new Error('Firebase is not initialized');
        }
    }

    public static getReference(type: PathReferenceType, path: string) {
        FirebaseClient._instance.validateInitialization();
        
        if (type == 'collection') {
           return FirebaseClient.firestore.collection(path);
        } else {
           return FirebaseClient.firestore.doc(path);
        }
    }
}