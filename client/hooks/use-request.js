import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const res = await axios[method](url, body, {withCredentials: true});
            setErrors(null);

            if (onSuccess) {
                onSuccess(res.data);
            }
            return res.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger mt-3" role="alert">
                    {
                        error.response.data.errors.map((err, index) => (
                            <div key={index}>{err.message}</div>
                        ))
                    }
                </div>
            );
        }
    }

    return { doRequest, errors };
}

export default useRequest;