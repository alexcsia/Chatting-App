export const constructPayload = (eventType: string, username: string) => {
  const payload = {
    event: eventType,
    data: {
      from: username,
    },
  };

  return payload;
};
