import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageContainer from "./components/PageContainer";

export default function OnboardingLayout() {
  return (
    <PageContainer>
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </PageContainer>
  );
}
