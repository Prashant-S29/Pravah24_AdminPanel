export const getEventDetails = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
            cache: "no-store",
        });
        const allEventList = res.json();

        if (!res.ok) {
            throw new Error("Failed to fetch events");
        }
        // console.log(allEventList);
        return allEventList;
    } catch (error) {
        console.log("Error:  ", error);
    }
};

