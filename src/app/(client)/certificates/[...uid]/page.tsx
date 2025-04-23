const CertificateStakeholderPage = async ({
  params,
}: {
  params: Promise<{ uid: string[] }>;
}) => {
  const [eventUid, userUid] = (await params).uid;
  if (!eventUid || !userUid) {
    return <div>Invalid UID</div>;
  }
  if (eventUid && userUid === "preview") {
    return <div>Preview Mode</div>;
  }
  return <div>{userUid}</div>;
};

export default CertificateStakeholderPage;
