import { Toast } from "@shopify/app-bridge-react";
import {
    Card,
    Heading,
    TextContainer
} from "@shopify/polaris";
import { useState } from "react";

import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function LoadScriptTag() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/script/load",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });


  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  const deleteTag = async (id) => {
    setIsLoading(true);
    const response = await fetch("/api/script/delete?id=" + id);

    if (response.ok) {
      refetchProductCount();
      setToastProps({ content: "deleted" });
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
          content: "Load",
          onAction: refetchProductCount,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <Heading element="h4">
            1. Here are your added Scripts

            {data?.map((item) => {
              return (
                <div key="{item}">
                  <p>{item.id}</p>
                  <button onClick={() => deleteTag(item.id)}>Delete</button>
                </div>
              );
            })}
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
