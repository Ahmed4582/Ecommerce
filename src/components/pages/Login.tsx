import { Navigate } from "react-router-dom";
import useLogin from "@components/hooks/useLogin";
import { Heading } from "@components/coomon";
import { Input } from "@components/Form";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";



const Login = () => {
  const {
    error,
    loading,
    accessToken,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();


if(accessToken) {
  return <Navigate to="/" />
}


  return (
     <>
    <Heading title="User Login"/>
    <Row>
      <Col md={{span:6 , offset:3}}>

        {searchParams.get("message") === "login_required" && (
          <Alert variant="success">You need to login to view this content</Alert>
        )}

        {searchParams.get("message") === "account_created" && (
          <Alert variant="success">Your account successfuly created, please login</Alert>
        )}
          <Form onSubmit={handleSubmit(submitForm)}>
              <Input
            label="Email address"
            register={register} 
            name="email"
            error={formErrors.email?.message}
            />
            
            <Input
            type="password"
            label="Password"
            register={register} 
            name="password"
            error={formErrors.password?.message}
            />

  <Button type="submit" className="btn btn-info text-white ">
     {loading === "pending" ? (
                <>
                    <Spinner animation="border" size="sm"></Spinner> Loading...
                </>       
              ) : ( 
                "Submit"
            )}
  </Button>
  {error && <p style={{color: "#DC3545" , marginTop: "10px"}}>{error}</p>}
</Form>
      </Col>
    </Row>

    </>
  )
}

export default Login
