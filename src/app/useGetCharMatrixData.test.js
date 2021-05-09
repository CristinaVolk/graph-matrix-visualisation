import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";
import { strictEqual } from "assert";
import { renderHook } from "@testing-library/react-hooks";

import * as hooks from "./useGetCharMatrixData";
import { URL } from "./../utils/appData";

describe("mocking axios requests", function () {
  const mockedDataResponse = {
    nodes: [
      {
        name: "Myriel",
        group: 1,
      },
      {
        name: "Napoleon",
        group: 1,
      },
      {
        name: "Mlle.Baptistine",
        group: 1,
      },
      {
        name: "Mme.Magloire",
        group: 1,
      },
    ],

    links: [
      {
        source: 1,
        target: 0,
        value: 1,
      },
      {
        source: 2,
        target: 0,
        value: 8,
      },
      {
        source: 3,
        target: 0,
        value: 10,
      },
    ],
  };

  describe("across entire suite", function () {
    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });

    it("just for a single spec", function (done) {
      const mockedfetchCharMatrixData = jest.fn();
      hooks.useGetCharMatrixData = jest.fn().mockReturnValue({
        fetchCharMatrixData: mockedfetchCharMatrixData,
      });

      renderHook(() => hooks.useGetCharMatrixData().fetchCharMatrixData());

      moxios.withMock(function () {
        let onFulfilled = sinon.spy();
        axios.get(URL).then(onFulfilled);

        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request
            .respondWith({
              status: 200,
              response: mockedDataResponse,
            })
            .then(function () {
              strictEqual(onFulfilled.called, true);
              done();
            });
        });
      });
      expect(mockedfetchCharMatrixData).toHaveBeenCalled();
    });

    // it("Should reject the request", function (done) {
    //   const errorResp = {
    //     status: 400,
    //     response: { message: "invalid data" },
    //   };

    //   moxios.withMock(function () {
    //     let onFulfilled = sinon.spy();
    //     axios
    //       .get("https://bost.ocks.org/mike/miserables/miserables.json")
    //       .then(onFulfilled);

    //     moxios
    //       .wait(function () {
    //         let request = moxios.requests.mostRecent();
    //         request.reject(errorResp);
    //       })
    //       .catch(function (err) {
    //         strictEqual(err.status, errorResp.status);
    //         strictEqual(err.response.message, errorResp.response.message);
    //         done();
    //       });
    //   });
    // });
  });
});
