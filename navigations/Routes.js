import React from "react";
import { firebase } from "../firebase/config";
import TabNavigation from "../navigations/TabNavigation";
import Admin from "../screens/Admin";
import AuthNavigation from "./AuthNavigation";
const Routes = () => {
  const [loading, setLoading] = React.useState(true);

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .once("value", (snapshot) => {
            const userData = snapshot.val();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
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
        user.email === "admin@gmail.com" ? (
          <Admin logOut={logOut} />
        ) : (
          <TabNavigation user={user} logOut={logOut} />
        )
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default Routes;
