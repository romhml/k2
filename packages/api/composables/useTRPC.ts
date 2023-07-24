export const useTRPC = () => {
  const { $trpc } = useNuxtApp();
  return $trpc;
};
