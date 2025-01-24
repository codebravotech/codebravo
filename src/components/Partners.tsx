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
      <div className="text-xl underline">Collaborators:</div>

      {partners.map((object) => {
        const { partner_role, partner } = object;
        const { name, location } = partner;
        return (
          <div key={`partner_${name}`} className="text-lg">
            <div className="mt-1">
              <span className="">
                <span className="">{name}</span>
                <div className="mt-1 italic">{location}</div>
              </span>
            </div>
            <div className="mt-1 italic">{partner_role}</div>
          </div>
        );
      })}
    </div>
  );
}
