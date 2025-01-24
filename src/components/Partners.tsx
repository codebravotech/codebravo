import { PartnerObject } from "../types/components";

export default function Partners({
  partners = [],
}: {
  partners: PartnerObject[];
}) {
  if (!(partners?.length > 0)) {
    return null;
  }

  return (
    <div>
      <div className="mb-2 underline">Special thanks to my collaborators:</div>

      {partners.map((object) => {
        const { partner_role, partner } = object;
        const { name, location } = partner;
        return (
          <div key={`partner_${name}`}>
            <div>
              <span className="">
                <span className="">{name}</span> --{" "}
                <span className="italic">{location}</span>
              </span>
            </div>
            <div className="mt-1 italic">Project role: {partner_role}</div>
          </div>
        );
      })}
    </div>
  );
}
