import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Models } from "node-appwrite";
import { useState, useEffect } from "react";

export const useLoggedInUser = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getLoggedInUser();
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        setError("Failed to fetch user");
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
