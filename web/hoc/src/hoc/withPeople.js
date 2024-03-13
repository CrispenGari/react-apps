import { useQuery } from "react-query";
export const withPeople = (Comp) => {
  return (props) => {
    const { data, isLoading } = useQuery({
      queryKey: ["people"],
      queryFn: async (params) => {
        const res = await fetch("http://localhost:3001/all");
        const people = await res.json();
        return {
          people,
        };
      },
    });

    return (
      <Comp
        {...props}
        state={{ people: data?.people ? data.people : [], fetching: isLoading }}
      />
    );
  };
};
