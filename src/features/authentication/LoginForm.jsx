import { use, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormBody from "../../ui/FormBody";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import styled from "styled-components";
import { Link } from "react-router";
import PasswordField from "../../ui/PasswordField";
import { useSignup } from "./useSignup";
import { useLogin } from "./useLogin";

const StyledLoginForm = styled(Form)`
  gap: var(--spacing-400);

  /* & *:last-child {
    flex-grow: 0;
  } */
`;

const BottomText = styled.p`
  text-align: center;

  & button {
    margin-left: var(--spacing-50);
    display: inline;
    border-bottom: 1px solid var(--color-grey-900);
    border-radius: unset;
    color: var(--color-grey-900);
    font-weight: bold;
  }
`;

function LoginForm() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: {},
    });

  const { isLoading, signup } = useSignup();
  const { isLogin, login } = useLogin();

  function handleChangeToSignUp(e) {
    e.preventDefault();
    setIsSignedUp((curr) => !curr);
  }

  function handleShowPassword(e) {
    e.preventDefault();
    setShowPassword((curr) => !curr);
  }

  function handleShowRepeatPassword(e) {
    e.preventDefault();
    setShowRepeatPassword((curr) => !curr);
  }

  function onSubmit({ userName: user_name, email, password }) {
    console.log(user_name, email, password);

    if (!isSignedUp)
      signup({ user_name, email, password }, { onSettled: () => reset() });
    else login({ email, password });
  }

  function onError(errors) {
    console.log(errors);
  }

  const { errors } = formState;
  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h1">{isSignedUp ? "Login" : "Sign Up"}</Heading>
      <FormBody>
        {!isSignedUp && (
          <FormRow
            fieldLabel={"name"}
            error={errors?.userName?.message}
            tip={""}
          >
            <Input
              // disabled={isAuthorising}

              name="userName"
              type="text"
              id="userName"
              {...register("userName", {
                required: "This field is required",
              })}
            />
          </FormRow>
        )}
        <FormRow fieldLabel={"email"} error={errors?.email?.message} tip={""}>
          <Input
            // disabled={isAuthorising}

            name="email"
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",

              validate: (value) => {
                return (
                  value.toString().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !==
                    null || "Incorrect email format. Use: name@XXXX.XXX"
                );
              },
            })}
          />
        </FormRow>
        <FormRow
          fieldLabel={isSignedUp ? "password" : "create password"}
          error={errors?.password?.message}
          tip={"Passwords must be at least 8 characters"}
        >
          <PasswordField
            // disabled={isAuthorising}

            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            showPass={handleShowPassword}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },

              validate: (value) => {
                return (
                  value
                    .toString()
                    .match(
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                    ) !== null ||
                  "Use uppercase letters, lower case letters and digits"
                );
              },
            })}
          />
        </FormRow>
        {!isSignedUp && (
          <FormRow
            fieldLabel={"repeat password"}
            error={errors?.repeatPassword?.message}
            tip={""}
          >
            <PasswordField
              //   disabled={isAuthorising}

              name="repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              id="repeatPassword"
              showPass={handleShowRepeatPassword}
              {...register("repeatPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters",
                },

                validate: (value) => {
                  return (
                    getValues().password === value.toString() ||
                    "Passwords must match"
                  );
                },
              })}
            />
          </FormRow>
        )}
      </FormBody>
      <Button
        $variation={"primary"}
        /*disabled={isAuthorising}> */ style={{ marginTop: "14px" }}
      >
        {isSignedUp ? "Login" : "Create Account"}
      </Button>

      <BottomText>
        <span>
          {isSignedUp
            ? "Need to create an account?"
            : "Already have an account?"}
        </span>
        <Button
          $variation={"plaintext"}
          onClick={(e) => handleChangeToSignUp(e)}
        >
          {isSignedUp ? "Sign Up" : "Login"}
        </Button>
      </BottomText>
    </StyledLoginForm>
  );
}

export default LoginForm;
