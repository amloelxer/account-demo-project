import Account from "../entities/account";

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const mockWithdrawFromSourceAccount = async (
  transferAmount: number,
  sourceAccountId: string,
): Promise<Error | void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const number = randomIntFromInterval(1, 10);
      if (number > 7) {
        reject(new Error("Source account has invalid number of funds"));
      } else {
        resolve();
      }
    }, 5000);
  });
};

export const mockTransferToDestinationAccount = async (
  transferAmount: number,
  destinationAccountId: string,
): Promise<Error | void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const number = randomIntFromInterval(1, 10);
      if (number > 7) {
        reject(
          new Error(
            "Unable to transfer funds to destination account due to internal error",
          ),
        );
      } else {
        resolve();
      }
    }, 5000);
  });
};

/**
 *
 * @param sourceAccount
 * @param destinationAccount
 *
 * This is a mock function but you can imagine if anything goes wrong here
 * we are in a weird non atomic state and we should page the on call as this is incredibly problematic
 */
export const mockRestorePreviousFundState = async (
  sourceAccount: Account,
  destinationAccount: Account,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

/**
 * Make sure any funds we have transferred or are in the process of transferring get put back
 * Also reference the current transfer and make sure it's faileed
 */
export const mockCleanup = async (): Promise<void> => {};
