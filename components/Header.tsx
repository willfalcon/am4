import MainNav from "./MainNav";
import UserButton from "./UserButton";

export default function Header () {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <MainNav />
        <UserButton />
      </div>
    </header>
  );
}