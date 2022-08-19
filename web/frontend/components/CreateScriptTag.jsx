import { Toast } from "@shopify/app-bridge-react";
import {
    Card,
    Heading,
    TextContainer
} from "@shopify/polaris";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function CreateScriptTag() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();



  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/script/create");

    if (response.ok) {
      
      setToastProps({ content: "Script Tag Installed" });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        sectioned
        primaryFooterAction={{
          content: "Add",
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <Heading element="h4">
            1. Add Script to Page
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
