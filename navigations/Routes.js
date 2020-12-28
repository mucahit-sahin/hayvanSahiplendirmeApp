import React from "react";
import { firebase } from "../firebase/config";
import TabNavigation from "../navigations/TabNavigation";
import AuthNavigation from "./AuthNavigation";
const Routes = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  const logOut = () => {
    firebase.auth().signOut();
    setUser();
  };

  if (loading) {
    return <></>;
  }
  return (
    <>
      {user ? (
        <TabNavigation user={user} logOut={logOut} />
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default Routes;
