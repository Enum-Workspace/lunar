import type { Meta, StoryObj } from "@storybook/react-vite";
import { withAppShell } from "@/stories/decorators";
import Identity from "./Identity";

const meta = {
  title: "Pages/Identity",
  component: Identity,
  decorators: [withAppShell],
} satisfies Meta<typeof Identity>;

export default meta;
type Story = StoryObj<typeof meta>;

// With no reachable gateway the page renders its "not enabled" setup card,
// which is the safe default state.
export const Default: Story = {};
