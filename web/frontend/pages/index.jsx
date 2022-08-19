import { TitleBar } from "@shopify/app-bridge-react";
import {
  Card, Heading, Layout, Page, Stack, TextContainer
} from "@shopify/polaris";



export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Codext Age Modal" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">

                  <Heading>This Plugin will show a Age 18 German Modal 🎉</Heading>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        
      </Layout>
    </Page>
  );
}
