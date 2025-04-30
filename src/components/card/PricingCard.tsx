import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IPricingPackage } from "@/lib/types/General";

const PricingCard = ({ packageData }: { packageData: IPricingPackage }) => {
  return (
    <Card
      className={`bordered h-full border-b-4 hover:border-b-1 ${
        packageData.packageStyle
      } py-5 ${packageData.id === 2 ? "" : "scale-90"}`}
    >
      <CardHeader>
        <CardTitle className="font-bold text-xl">
          {packageData.packageName}
        </CardTitle>
        <CardDescription className="text-sm text-gray-700">
          {packageData.packageDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-end">
        <CardTitle>
          <span className="text-lg md:text-xl font-bold">
            Rp.{" "}
            <span className="text-2xl md:text-3xl font-bold">
              {packageData.packagePrice.toString().slice(0, 3).toUpperCase()}
            </span>
            ,000 /
          </span>
          <span className="text-sm font-medium"> One Time Payment</span>
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
                <h5 className="text-xs md:text-sm font-medium">
                  {i + 1}. {feature.feature}
                </h5>
                <div className="ml-10">{feature.icon}</div>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
