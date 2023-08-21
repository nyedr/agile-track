import { buttonVariants } from "@/ui/Button";
import LinkButton from "@/ui/LinkButton";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-5">
      <LinkButton variant="color" href="/login">
        Log in
      </LinkButton>
      <LinkButton
        className={buttonVariants({
          className: "hover:bg-primary-color-accent",
        })}
        href="/register"
      >
        Sign up
      </LinkButton>
    </div>
  );
};

export default AuthButtons;
