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
    <>
      <h3 className="underline">Badass Partners</h3>

      {partners.map((object) => {
        const { partner_role, partner } = object;
        const { name, location } = partner;
        return (
          <>
            <div>
              <span className="italic">
                {name} -- {location}
              </span>
            </div>
            <div>{partner_role}</div>
          </>
        );
      })}
    </>
  );
}
