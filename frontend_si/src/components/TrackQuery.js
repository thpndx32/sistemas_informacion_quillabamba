import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore"

export const TrackQuery = (
    q, loading, setLoading
)=>{
    const [data,loadingData] = useCollection(q);
    return [data];
}