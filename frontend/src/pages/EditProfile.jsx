import ProfileDetailsCard from "../components/profile/ProfileDetailsCard";
import ProfilePasswordCard from "../components/profile/ProfilePasswordCard";

function EditProfile({ account, setAccount }) {
  return (
    <>
      <ProfileDetailsCard account={account} setAccount={setAccount} />
      <ProfilePasswordCard />
    </>
  );
}

export default EditProfile;
