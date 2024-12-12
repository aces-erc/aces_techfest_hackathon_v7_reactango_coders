import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postRequest } from "../api/endPoints";
import { requestValidationSchema } from "../validation/RequestValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RequestPage = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestValidationSchema),
  });

  const onSubmit = async (data) => {
    // const username = localStorage.getItem("username");
    // console.log(username);

    try {
      const { wasteType, wasteWeight, urgency, location } = data;
      const requestData = {
        waste_type: wasteType,
        waste_weight: wasteWeight,
        location,
        urgency,
      };
      const res = await postRequest(requestData);
      if (res.status === 201) {
        toast("Request Submitted Successfully");
        navigate(`/profile/${username}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 m-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-2xl w-[40%] h-[90%] flex flex-col justify-between"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Waste Removal Request
        </h1>

        <div className="flex flex-col space-y-6 flex-1">
          {/* Waste Type */}
          <div>
            <label
              htmlFor="wasteType"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Waste Type
            </label>
            <select
              id="wasteType"
              {...register("wasteType")}
              className={`w-full border ${
                errors.wasteType ? "border-red-500" : "border-gray-300"
              } p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200`}
            >
              <option value="">Select Waste Type</option>
              <option value="BIO">Degradable</option>
              <option value="NON">Non-BioDegradable</option>
            </select>
            {errors.wasteType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.wasteType.message}
              </p>
            )}
          </div>

          {/* Waste Weight */}
          <div>
            <label
              htmlFor="wasteWeight"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Waste Weight (kg)
            </label>
            <input
              id="wasteWeight"
              type="number"
              {...register("wasteWeight")}
              className={`w-full border ${
                errors.wasteWeight ? "border-red-500" : "border-gray-300"
              } p-3 rounded-md focus:ring-2 focus:ring-green-500 transition-all duration-200`}
              placeholder="Enter weight in kg"
            />
            {errors.wasteWeight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.wasteWeight.message}
              </p>
            )}
          </div>

          {/* Urgency */}
          <div>
            <label
              htmlFor="urgency"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Urgency
            </label>
            <select
              id="urgency"
              {...register("urgency")}
              className={`w-full border ${
                errors.urgency ? "border-red-500" : "border-gray-300"
              } p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200`}
            >
              <option value="">Select Urgency</option>
              <option value="LOW">Low</option>
              <option value="HIGH">High</option>
            </select>
            {errors.urgency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.urgency.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Location
            </label>
            <select
              id="location"
              {...register("location")}
              className={`w-full border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } p-3 rounded-md focus:ring-2 focus:ring-green-500 transition-all duration-200`}
            >
              <option value="">Select Location</option>
              <option value="ITH">Itahari</option>
              <option value="KTM">Kathmandu</option>
              <option value="SAG">Namche Bazaar</option>
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-green-500 hover:scale-105 transform transition-all duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPage;
