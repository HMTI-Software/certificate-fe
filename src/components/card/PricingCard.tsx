import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IPricingPackage } from "@/lib/Interface";

const PricingCard = ({ packageData }: { packageData: IPricingPackage }) => {
  let mobileOrder = "";
  if (packageData.packageName === "Klee Package") {
    mobileOrder = "order-1";
  } else if (packageData.packageName === "Furina Package") {
    mobileOrder = "order-2";
  } else if (packageData.packageName === "Diluc Package") {
    mobileOrder = "order-3";
  }
  if (packageData.packageName === "Klee Package") {
    return (
      <Card
        className={`bordered border-b-4 hover:border-b-1 ${packageData.packageStyle} py-5 ${mobileOrder} md:order-none`}
      >
        <CardHeader>
          <CardTitle className="font-bold text-xl">
            {packageData.packageName}
          </CardTitle>
          <CardDescription className="text-xs text-gray-700">
            {packageData.packageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-end">
          <CardTitle className="text-2xl font-bold">
            Rp.{" "}
            <span className="text-4xl font-bold">
              {packageData.packagePrice.toString().slice(0, 3).toUpperCase()}
            </span>
            ,000
          </CardTitle>
          <Separator orientation={"horizontal"} className="my-2 bg-black" />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            {packageData.packageFeatures.map((feature, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row items-center justify-between"
                >
                  <h5>
                    {i + 1}. {feature.feature}
                  </h5>
                  <div>{feature.icon}</div>
                </div>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card
      className={`bordered scale-90 border-b-4 hover:border-b-1 ${packageData.packageStyle} py-5 ${mobileOrder} md:order-none`}
    >
      <CardHeader>
        <CardTitle className="font-bold text-xl">
          {packageData.packageName}
        </CardTitle>
        <CardDescription className="text-xs text-gray-700">
          {packageData.packageDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-end">
        <CardTitle className="text-2xl font-bold">
          Rp.{" "}
          <span className="text-4xl font-bold">
            {packageData.packagePrice.toString().slice(0, 3).toUpperCase()}
          </span>
          ,000
        </CardTitle>
        <Separator orientation={"horizontal"} className="my-2 bg-black" />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          {packageData.packageFeatures.map((feature, i) => {
            return (
              <div
                key={i}
                className="flex flex-row items-center justify-between"
              >
                <h5>
                  {i + 1}. {feature.feature}
                </h5>
                <div>{feature.icon}</div>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
